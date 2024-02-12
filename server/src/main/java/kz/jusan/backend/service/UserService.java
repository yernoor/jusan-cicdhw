package kz.jusan.backend.service;

import kz.jusan.backend.entity.RoleEntity;
import kz.jusan.backend.entity.UserEntity;
import kz.jusan.backend.repository.RoleRepository;
import kz.jusan.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity saveUser(UserEntity user) {
        RoleEntity userRole = roleRepository.findRoleEntityByName("ROLE_USER");
        user.setRoleEntity(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findUserEntityByUsername(username);
    }

    public UserEntity findByUsernameAndPassword(String username, String password) {
        UserEntity user = findByUsername(username);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }
}