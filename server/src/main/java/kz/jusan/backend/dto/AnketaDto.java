package kz.jusan.backend.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.*;

@Data
public class AnketaDto {
    @NotBlank
    private String iin;
    private UserProfileDto userProfileDto;
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
    private String relativePhone;
    private String relativeFIO;
    private String relativeLevel;
    private String permanentCity;
    private String permanentRegion;
    private String permanentDistrict;
    private String permanentStreet;
    private String permanentHouse;
    private String permanentCorpus;
    private String permanentApartment;
    private boolean isAddressMatches = false;
    private String factualRegion;
    private String factualDistrict;
    private String factualStreet;
    private String factualHouse;
    private String factualCorpus;
    private String factualApartment;
    private List<EducationDto> educationList;
    private List<ExtracurricularDto> extracurricularList;
    private List<WorkplaceDto> lastThreeWorkplaces;
    private List<RecommendationPersonDto> threeRecommendationPeople;
    private String marriageStatus;

    private List<LifeCompanionDto> lifeCompanion;

    private List<ChildDto> chilrenList;
    private List<RelativeDto> relativeList;
    private List<CommercialOrganisationDto> commercialOrganisationList;
    private boolean isRelativeJusanEmployee;
    private List<RelativeJusanEmployeeDto> relativeJusanEmployeeList;
    private boolean isCarOwner;
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
}
