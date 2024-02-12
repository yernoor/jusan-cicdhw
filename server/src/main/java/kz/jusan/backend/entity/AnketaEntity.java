package kz.jusan.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import kz.jusan.backend.dto.*;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "anketas")
public class AnketaEntity {
    @Id
    @Column(name = "iin")
    private String iin;
//    private String fio;
    private String previousName;
    private String birthDate;
    private String birthPlace;
    private String nationality;
    private String citizenship;
    private String passportSerie;
    private String passportNumber;
    private String passportIssuedBy;
    private String passportIssuedAt;
    private String homePhone;
    private String workPhone;
//    private String mobilePhone;
    private String relativePhone;
    private String relativeFIO;
    private String relativeLevel;
//    private String email;
    private String permanentCity;
    private String permanentRegion;
    private String permanentDistrict;
    private String permanentStreet;
    private String permanentHouse;
    private String permanentCorpus;
    private String permanentApartment;
    private boolean isAddressMatches = false;
//    private String factualCity;
    private String factualRegion;
    private String factualDistrict;
    private String factualStreet;
    private String factualHouse;
    private String factualCorpus;
    private String factualApartment;
    @ElementCollection
    private List<EducationDto> educationList = new ArrayList<EducationDto>();
    @ElementCollection
    private List<ExtracurricularDto> extracurricularList;
    @ElementCollection
    private List<WorkplaceDto> lastThreeWorkplaces;
    @ElementCollection
    private List<RecommendationPersonDto> threeRecommendationPeople;
    private String marriageStatus;
    @ElementCollection
    private List<LifeCompanionDto> lifeCompanion;
    @ElementCollection
    private List<ChildDto> chilrenList;
    @ElementCollection
    private List<RelativeDto> relativeList;
    @ElementCollection
    private List<CommercialOrganisationDto> commercialOrganisationList;
    private boolean isRelativeJusanEmployee;
    @ElementCollection
    private List<RelativeJusanEmployeeDto> relativeJusanEmployeeList;
    private boolean isCarOwner;
    @ElementCollection
    private List<CarDto> carList;
    private boolean isMilitary;
    private boolean isSVC;
    private String isSVCAnswer; // WARNING: before it was svc
    private boolean isExpiredLoan;
    private String isExpiredLoanAnswer;
    private boolean isCriminal;
    private String isCriminalAnswer;
    private boolean isRelativeCriminal;
    private String isRelativeCriminalAnswer;
    private boolean isCriminalDelo;
    private String isCriminalDeloAnswer;
    private boolean isAlimentPayer;
    private String isAlimentPayerAnswer;
    private boolean isHooligan;
    private String isHooliganAnswer;
    private String additionalInfo;
    private String extraIncome;

    @OneToOne(mappedBy = "anketa")
    private UserProfile userProfile;
}
