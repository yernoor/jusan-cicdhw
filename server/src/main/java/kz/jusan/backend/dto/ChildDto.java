package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class ChildDto {
    private String fio;
    private String birthDate;
    private String phone;
    private String studyOrWork;
}

