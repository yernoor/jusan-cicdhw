package kz.jusan.backend.controller;

import kz.jusan.backend.dto.UserProfileDto;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.entity.UserProfile;
import kz.jusan.backend.security.JwtProvider;
import kz.jusan.backend.service.UserProfileService;
import kz.jusan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/profile")
public class UserProfileController {
    @Autowired
    UserProfileService userProfileService;
    @Autowired
    private UserService userService;
    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/submit")
    public ResponseEntity<Object> post(@RequestBody UserProfileDto userProfileDto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> responseMessage = new HashMap<>();
        try {
            UserEntity user = userService.findByUsername(jwtProvider.getUsernameFromToken(token));
            userProfileService.createProfile(userProfileDto, user);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            responseMessage.put("message", "Please enter the correct data");
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> get(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> responseMessage = new HashMap<>();
        try {
            UserEntity user = userService.findByUsername(jwtProvider.getUsernameFromToken(token));
            UserProfile profile = userProfileService.getProfile(user);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } catch (Exception e) {
            responseMessage.put("message", "There is no profile for this user yet");
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }
}
