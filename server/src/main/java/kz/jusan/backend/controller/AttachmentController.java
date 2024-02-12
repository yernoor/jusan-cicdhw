package kz.jusan.backend.controller;

import kz.jusan.backend.dto.ResponseDto;
import kz.jusan.backend.entity.Attachment;
import kz.jusan.backend.service.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping(path="/api/v1")
@RequiredArgsConstructor
public class AttachmentController {

    private final AttachmentService attachmentService;

    @PostMapping(value = "/upload/image/{iin}")
    public ResponseDto uploadImage(@PathVariable("iin") String iin,
                                   @RequestParam("image") MultipartFile file, @RequestParam String type) throws Exception {
        Attachment attachment = attachmentService.createAttachment(file, iin, type);
        String downloadURI = "";
        downloadURI = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/api/v1/download/")
                        .path(attachment.getId())
                        .toUriString();

        return new ResponseDto(attachment.getFileName(),
                downloadURI,
                file.getContentType(),
                file.getSize(),
                type);
    }

    @PostMapping(value = "/upload/file/{iin}")
    public ResponseDto uploadDocument(@PathVariable("iin") String iin,
                                      @RequestBody() MultipartFile file,
                                      @RequestParam String type) throws Exception {
        System.out.println(type);
        Attachment attachment = attachmentService.createAttachment(file, iin, type);
        String downloadURI = "";
        downloadURI = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/download/")
                .path(attachment.getId())
                .toUriString();

        return new ResponseDto(attachment.getFileName(),
                downloadURI,
                file.getContentType(),
                file.getSize(),
                type);
    }

    @GetMapping("/download/zip/{iin}")
    public void downloadAllFiles(@PathVariable("iin") String iin, HttpServletResponse response) {
        List<Attachment> attachments = attachmentService.findAttachmentsByIin(iin);
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename="+iin+"_docs.zip");
        try(ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())) {
            for(Attachment attachment: attachments) {
                FileSystemResource fileSystemResource = new FileSystemResource(attachment.getFilePath());
                ZipEntry zipEntry = new ZipEntry(fileSystemResource.getFilename());
                zipEntry.setSize(fileSystemResource.contentLength());
                zipEntry.setTime(System.currentTimeMillis());

                zipOutputStream.putNextEntry(zipEntry);

                StreamUtils.copy(fileSystemResource.getInputStream(), zipOutputStream);
                zipOutputStream.closeEntry();
            }
            zipOutputStream.finish();
        } catch (IOException e) {
            System.out.println(e);
        }
    }


    @GetMapping("/download/sb/zip/{iin}")
    public void downloadAllFilesForSB(@PathVariable("iin") String iin,
                                      @RequestParam List<String> types,
                                      HttpServletResponse response) {
        List<Attachment> attachments = attachmentService.findAttachmentsByIin(iin);
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename="+iin+"_SB_docs.zip");
        try(ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())) {
            for(Attachment attachment: attachments) {
                if(types.contains(attachment.getType())) {
                    FileSystemResource fileSystemResource = new FileSystemResource(attachment.getFilePath());
                    ZipEntry zipEntry = new ZipEntry(fileSystemResource.getFilename());
                    zipEntry.setSize(fileSystemResource.contentLength());
                    zipEntry.setTime(System.currentTimeMillis());

                    zipOutputStream.putNextEntry(zipEntry);

                    StreamUtils.copy(fileSystemResource.getInputStream(), zipOutputStream);
                    zipOutputStream.closeEntry();
                }
            }
            zipOutputStream.finish();
        } catch (IOException e) {
            System.out.println(e);
        }
    }


    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileId") String fileId) throws Exception {
        Attachment attachment = attachmentService.getAttachment(fileId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                .body(new FileSystemResource(attachment.getFilePath()));
    }

    @GetMapping("/attachments/all")
    public List<Attachment> getAllAttachments() {
        return attachmentService.findAllAttachments();
    }

    @GetMapping("/attachments/{iin}")
    public List<Attachment> getAllAttachments(@PathVariable("iin") String iin) {
        return attachmentService.findAttachmentsByIin(iin);
    }

    @DeleteMapping("/attachments/delete/{iin}")
    @Transactional
    public String deleteAttachmentsByIin(@PathVariable("iin") String iin) {
        attachmentService.deleteAttachmentsByIin(iin);
        return "Success";
    }

}
