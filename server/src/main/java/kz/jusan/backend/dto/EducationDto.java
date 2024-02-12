package kz.jusan.backend.dto;

import lombok.*;

import javax.persistence.Embeddable;
import java.util.Date;

@RequiredArgsConstructor
@Getter
@Setter
@Embeddable
public class EducationDto {
    private String qualification;
    private String startDate;
    private String endDate;
    private String speciality;
    private String formOfStudy;
    private String university;
}
