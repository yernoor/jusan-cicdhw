package kz.jusan.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "profile")
public class UserProfile {
    @Id
    @Column(name = "iin")
    private String iin;
    private String fio;
    private String mobilePhone;
    private String email;
    private String factualCity;

//    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "profile_anketa_entity",
            joinColumns = @JoinColumn(name = "user_profile_iin"),
            inverseJoinColumns = @JoinColumn(name = "anketa_entity_iin"))
    @JsonIgnore
    private AnketaEntity anketa;

    @OneToOne(mappedBy = "userProfile")
    @JsonIgnore
    private UserEntity userEntity;
}