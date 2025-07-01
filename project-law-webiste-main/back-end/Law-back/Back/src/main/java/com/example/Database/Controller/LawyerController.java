package com.example.Database.Controller;

import com.example.Database.Models.Lawyer;
import com.example.Database.Service.LawyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lawyers")
public class LawyerController {

    @Autowired
    private LawyerService lawyerService;

    @GetMapping
    public List<Lawyer> getAllLawyers() {
        return lawyerService.getAllLawyers();
    }

    @GetMapping("/{id}")
    public Lawyer getLawyerById(@PathVariable Long id) {
        return lawyerService.getLawyerById(id);
    }

    @PostMapping
    public Lawyer addLawyer(@RequestBody Lawyer lawyer) {
        return lawyerService.createLawyer(lawyer);
    }

    @PutMapping("/{id}")
    public Lawyer updateLawyer(@PathVariable Long id, @RequestBody Lawyer lawyer) {
        return lawyerService.updateLawyer(id, lawyer);
    }

    @DeleteMapping("/{id}")
    public void deleteLawyer(@PathVariable Long id) {
        lawyerService.deleteLawyer(id);
    }
}
