package com.example.Database.Service;

import com.example.Database.Models.Lawyer;
import com.example.Database.Models.Startup;
import com.example.Database.Repository.LawyerRepository;
import com.example.Database.Repository.StartupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StartupRepository startupRepo;

    @Autowired
    private LawyerRepository lawyerRepo;

    public Map<String, Object> authenticate(String username, String password) {
        Optional<Lawyer> lawyerOpt = lawyerRepo.findByUsername(username);
        if (lawyerOpt.isPresent() && lawyerOpt.get().getPassword().equals(password)) {
            Lawyer lawyer = lawyerOpt.get();
            return Map.of("id", lawyer.getId(), "userType", "lawyer");
        }

        Optional<Startup> startupOpt = startupRepo.findByUsername(username);
        if (startupOpt.isPresent() && startupOpt.get().getPassword().equals(password)) {
            Startup startup = startupOpt.get();
            return Map.of("id", startup.getId(), "userType", "startup");
        }

        throw new RuntimeException("Invalid username or password");
    }
}
