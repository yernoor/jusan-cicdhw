package kz.jusan.backend.repository;

import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    UserProfile findUserProfileByIin(String iin);
    UserProfile findUserProfileByUserEntity(UserEntity user);
}
