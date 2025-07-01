package com.example.Database.Repository;


import com.example.Database.Models.Startup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StartupRepository extends JpaRepository<Startup, Long> {
    List<Startup> findByCompanyNameLike(String companyName);
    Optional<Startup> findByUsername(String username);
}
