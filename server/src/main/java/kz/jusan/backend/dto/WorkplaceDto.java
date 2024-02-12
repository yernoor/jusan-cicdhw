package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class WorkplaceDto {
    private String workPeriod;
    private String organizationName;
    private String organizationType;
    private String organizationAddress;
    private String organizationPhone;
    private String speciality;
    private String employerFio;
    private String employerNumber;
    private String leavingReazon;
}
