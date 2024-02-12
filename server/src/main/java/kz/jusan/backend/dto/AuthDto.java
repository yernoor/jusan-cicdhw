package kz.jusan.backend.dto;

import lombok.Data;
import javax.validation.constraints.NotEmpty;

@Data
public class AuthDto {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}