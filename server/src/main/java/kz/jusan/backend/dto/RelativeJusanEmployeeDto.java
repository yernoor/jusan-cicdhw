package kz.jusan.backend.dto;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class RelativeJusanEmployeeDto {
    private String level;
    private String fio;
    private String division;
    private String major;
}
