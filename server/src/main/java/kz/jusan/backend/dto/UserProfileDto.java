package kz.jusan.backend.dto;

import kz.jusan.backend.entity.AnketaEntity;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String iin;
    private String fio;
    private String mobilePhone;
    private String email;
    private String factualCity;
}