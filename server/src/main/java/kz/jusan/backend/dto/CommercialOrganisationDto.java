package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class CommercialOrganisationDto {
    private String ipOrToo;
    private String organizationName;
    private String iin;
    private String address;
    private String type;
    private String phone;
}
