package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class RecommendationPersonDto {
    private String peopleFio;
    private String peopleWorkPlace;
    private String peopleMajor;
    private String peoplePhone;
}
