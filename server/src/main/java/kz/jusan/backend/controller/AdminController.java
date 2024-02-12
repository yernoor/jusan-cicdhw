package kz.jusan.backend.controller;

import kz.jusan.backend.common.CustomMail;
import kz.jusan.backend.common.CustomUserEmail;
import kz.jusan.backend.config.MailConfig;
import kz.jusan.backend.dto.CustomUserDto;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.response.CustomUserAddResponse;
import kz.jusan.backend.service.CustomPasswordGenerator;
import kz.jusan.backend.service.MailService;
import kz.jusan.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final MailService mailService;

    @PostMapping("user/add")
    public ResponseEntity<Object> addCustomUserByEmail(@Valid @RequestBody CustomUserEmail customUserEmail) {
        String email = customUserEmail.getEmail();
        String username = email.split("@")[0] + System.currentTimeMillis() % 1000;
        String password = CustomPasswordGenerator.getCustomPassword();

        CustomUserDto customUserDto = CustomUserDto.builder()
                .email(email)
                .username(username)
                .password(password)
                .build();

        UserEntity user = UserEntity.builder()
                .username(customUserDto.getUsername())
                .password(customUserDto.getPassword())
                .build();

        userService.saveUser(user);

        CustomMail mail = CustomMail.builder()
                .sender(MailConfig.SENDER)
                .receiver(email)
                .subject(MailConfig.SUBJECT)
                .text("Login: " + username + "\nPassword: " + password + "\n Link for the website: http://jusanhire.azurewebsites.net/")
                .build();

        mailService.sendMail(mail);


        CustomUserAddResponse response =
                new CustomUserAddResponse("User " + username + " added successfully with password " + password, HttpStatus.OK);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
