package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class ExtracurricularDto {
    private String endDate;
    private String educationTime;
    private String educationName;
    private String speciality;
    private String degree;
}
