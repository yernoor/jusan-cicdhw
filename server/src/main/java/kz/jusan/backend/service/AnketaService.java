package kz.jusan.backend.service;

import kz.jusan.backend.dto.AnketaDto;
import kz.jusan.backend.entity.AnketaEntity;
import kz.jusan.backend.entity.UserProfile;
import kz.jusan.backend.repository.AnketaRepository;
import kz.jusan.backend.repository.UserProfileRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class AnketaService {
    @Autowired
    private AnketaRepository anketaRepository;
    @Autowired
    private UserProfileRepository profileRepository;

    public void createAnketa(AnketaDto anketaDto) {
        ModelMapper modelMapper = new ModelMapper();
        AnketaEntity anketaEntity = modelMapper.map(anketaDto, AnketaEntity.class);
        UserProfile profile = modelMapper.map(anketaDto.getUserProfileDto(), UserProfile.class);
        anketaEntity.setUserProfile(profile);
        anketaRepository.save(anketaEntity);
        profile.setAnketa(anketaEntity);
        profileRepository.save(profile);
    }

    public AnketaEntity getAnketa(UserProfile profile) {
        return anketaRepository.findAnketaEntityByUserProfile(profile);
    }

    public List<AnketaEntity> getAllAnketas() {
        return anketaRepository.findAll();
    }

    public void deleteAnketaByIIN(String iin) {
        anketaRepository.deleteByIin(iin);
    }

    public AnketaEntity findAnketaByIIN(String iin) {
        return anketaRepository.findAnketaEntityByIin(iin);
    }

    public void deleteAllAnketas() {
        anketaRepository.deleteAll();
    }
}
