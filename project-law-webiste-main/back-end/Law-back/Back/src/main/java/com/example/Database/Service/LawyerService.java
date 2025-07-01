package com.example.Database.Service;

import com.example.Database.Models.Lawyer;
import com.example.Database.Repository.LawyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LawyerService {

    @Autowired
    private LawyerRepository lawyerRepository;

    public Lawyer getLawyerById(Long id) {
        Optional<Lawyer> lawyer = lawyerRepository.findById(id);
        return lawyer.orElse(null);
    }

    public List<Lawyer> getAllLawyers() {
        return lawyerRepository.findAll();
    }

    @Transactional
    public Lawyer createLawyer(Lawyer lawyer) {
        return lawyerRepository.save(lawyer);
    }

    @Transactional
    public Lawyer updateLawyer(Long id, Lawyer updatedLawyer) {
        Optional<Lawyer> existingLawyerOptional = lawyerRepository.findById(id);
        if (existingLawyerOptional.isPresent()) {
            Lawyer existingLawyer = existingLawyerOptional.get();
            existingLawyer.setUsername(updatedLawyer.getUsername());
            existingLawyer.setEmail(updatedLawyer.getEmail());
            existingLawyer.setSpecialization(updatedLawyer.getSpecialization());
            return lawyerRepository.save(existingLawyer);
        }
        return null;
    }


    @Transactional
    public void deleteLawyer(Long id) {
        lawyerRepository.deleteById(id);
    }
}
