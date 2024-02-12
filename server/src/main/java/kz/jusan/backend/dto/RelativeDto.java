package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class RelativeDto {
    private String level;
    private String fio;
    private String birthDate;
    private String workPlace;
    private String major;
    private String phone;
}
