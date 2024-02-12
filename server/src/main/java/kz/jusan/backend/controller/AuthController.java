package kz.jusan.backend.controller;

import kz.jusan.backend.dto.AuthDto;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.security.JwtProvider;
import kz.jusan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid AuthDto signUpRequest) {
        Map<String, Object> responseMessage = new HashMap<>();
        UserEntity u = new UserEntity();
        u.setPassword(signUpRequest.getPassword());
        u.setUsername(signUpRequest.getUsername());
        try {
            userService.saveUser(u);
            responseMessage.put("message", "User successfully registered");
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            responseMessage.put("Error", "This user already exists");
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(@RequestBody AuthDto request) {
        Map<String, Object> responseMessage = new HashMap<>();
        try {
            UserEntity user = userService.findByUsernameAndPassword(request.getUsername(), request.getPassword());
            String token = jwtProvider.generateToken(user.getUsername());
            responseMessage.put("token", token);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (Exception e) {
            responseMessage.put("Error", "There is no such user");
            return new ResponseEntity<>(responseMessage, HttpStatus.NOT_FOUND);
        }
    }
}