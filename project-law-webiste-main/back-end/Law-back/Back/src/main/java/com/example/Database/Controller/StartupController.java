package com.example.Database.Controller;

import com.example.Database.Models.Startup;
import com.example.Database.Service.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/startups")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @GetMapping
    public List<Startup> getAllStartups() {
        return startupService.getAllStartups();
    }

    @GetMapping("/{id}")
    public Startup getStartupById(@PathVariable Long id) {
        return startupService.getStartupById(id);
    }

    @PostMapping
    public Startup addStartup(@RequestBody Startup startup) {
        return startupService.createStartup(startup);
    }

    @PutMapping("/{id}")
    public Startup updateStartup(@PathVariable Long id, @RequestBody Startup startup) {
        return startupService.updateStartup(id, startup);
    }

    @DeleteMapping("/{id}")
    public void deleteStartup(@PathVariable Long id) {
        startupService.deleteStartup(id);
    }
}
