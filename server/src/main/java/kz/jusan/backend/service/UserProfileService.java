package kz.jusan.backend.service;

import kz.jusan.backend.dto.UserProfileDto;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.entity.UserProfile;
import kz.jusan.backend.repository.UserProfileRepository;
import kz.jusan.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserProfileService {
    @Autowired
    UserProfileRepository profileRepository;
    @Autowired
    UserRepository userRepository;

    public void createProfile(UserProfileDto userProfileDto, UserEntity user) {
        ModelMapper modelMapper = new ModelMapper();
        UserProfile profile = modelMapper.map(userProfileDto, UserProfile.class);
        profile.setUserEntity(user);
        profileRepository.save(profile);
        user.setUserProfile(profile);
        userRepository.save(user);
    }

    public UserProfile getProfile(UserEntity user) {
        return profileRepository.findUserProfileByUserEntity(user);
    }
}
