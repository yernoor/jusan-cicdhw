package kz.jusan.backend.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Email;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomUserEmail {
    @Email
    private String email;
}
