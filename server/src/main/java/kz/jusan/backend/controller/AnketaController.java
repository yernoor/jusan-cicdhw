package kz.jusan.backend.controller;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import kz.jusan.backend.dto.AnketaDto;
import kz.jusan.backend.entity.AnketaEntity;
import kz.jusan.backend.entity.Attachment;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.entity.UserProfile;
import kz.jusan.backend.security.JwtProvider;
import kz.jusan.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/anketa")
public class AnketaController {
    @Autowired
    private AnketaService anketaService;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    UserProfileService userProfileService;
    @Autowired
    private UserService userService;
    @Autowired
    JwtProvider jwtProvider;
    @PostMapping("/submit")
    public ResponseEntity<Object> postAnketa(@RequestBody AnketaDto anketaDto) {
        anketaService.createAnketa(anketaDto);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<AnketaEntity> getAllAnketas() {
        return anketaService.getAllAnketas();
    }

//    @GetMapping("/{iin}")
//    public AnketaEntity findAnketaByIIN(@PathVariable("iin") String iin) {
//        return anketaService.findAnketaByIIN(iin);
//    }
    @GetMapping("/get")
    public ResponseEntity<Object> getAnketa(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> responseMessage = new HashMap<>();
        try {
            UserEntity user = userService.findByUsername(jwtProvider.getUsernameFromToken(token));
            UserProfile profile = userProfileService.getProfile(user);
            return new ResponseEntity<>(profile.getAnketa(), HttpStatus.OK);
        } catch (Exception e) {
            responseMessage.put("message", "There is no anketa for this user yet");
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{iin}")
    @Transactional
    public void deleteAnketaByIIN(@PathVariable("iin") String iin) {
        anketaService.deleteAnketaByIIN(iin);
    }

    @DeleteMapping("/delete/all")
    @Transactional
    public void deleteAllAnketas() {
        anketaService.deleteAllAnketas();
    }

    @GetMapping("/download-pdf/{iin}")
    public ResponseEntity<Resource> generatePdf(@PathVariable("iin") String iin){
        Attachment attachment = attachmentService.createPdfAttachment(iin);
        System.out.println(attachment.getFileName());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                .body(new FileSystemResource(attachment.getFilePath()));
    }

}