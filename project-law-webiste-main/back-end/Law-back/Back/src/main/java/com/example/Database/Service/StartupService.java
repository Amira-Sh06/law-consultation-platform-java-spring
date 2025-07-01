package com.example.Database.Service;

import com.example.Database.Models.Startup;
import com.example.Database.Repository.StartupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StartupService {

    @Autowired
    private StartupRepository startupRepository;

    public Startup getStartupById(Long id) {
        Optional<Startup> startup = startupRepository.findById(id);
        return startup.orElse(null);
    }

    public List<Startup> getAllStartups() {
        return startupRepository.findAll();
    }

    @Transactional
    public Startup createStartup(Startup startup) {
        return startupRepository.save(startup);
    }

    @Transactional
    public Startup updateStartup(Long id, Startup updatedStartup) {
        Optional<Startup> existingStartupOptional = startupRepository.findById(id);
        if (existingStartupOptional.isPresent()) {
            Startup existingStartup = existingStartupOptional.get();
            existingStartup.setUsername(updatedStartup.getUsername());
            existingStartup.setEmail(updatedStartup.getEmail());
            existingStartup.setCompanyName(updatedStartup.getCompanyName());
            existingStartup.setDescription(updatedStartup.getDescription());
            return startupRepository.save(existingStartup);
        }
        return null;
    }

    @Transactional
    public void deleteStartup(Long id) {
        startupRepository.deleteById(id);
    }
}
