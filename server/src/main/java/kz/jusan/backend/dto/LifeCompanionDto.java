package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class LifeCompanionDto {
    private String fio;
    private String birthDate;
    private String workPlace;
    private String major;
    private String address;
    private String citizenship;
    private String phone;
}