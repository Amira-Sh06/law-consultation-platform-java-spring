package com.example.Database.Repository;


import com.example.Database.Models.Lawyer;
import com.example.Database.Models.Startup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, Long> {
    List<Lawyer> findBySpecialization(String specialization);
    Optional<Lawyer> findByUsername(String username);
}
