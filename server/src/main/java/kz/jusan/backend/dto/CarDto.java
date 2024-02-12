package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class CarDto {
    private String model;
    private String year;
    private String govNumber;
}
