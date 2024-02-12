package kz.jusan.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomUserDto {
    private String username;
    private String email;
    private String password;
}
