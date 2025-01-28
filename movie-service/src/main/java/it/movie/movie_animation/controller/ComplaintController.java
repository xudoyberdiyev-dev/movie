package it.movie.movie_animation.controller;

import it.movie.movie_animation.entity.Complaint;
import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.implment.controller.ComplaintControllerImpl;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqComplaintDto;
import it.movie.movie_animation.payload.ResComplaintDto;
import it.movie.movie_animation.repository.ComplaintRepository;
import it.movie.movie_animation.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/complaint")
@RequiredArgsConstructor
@CrossOrigin
public class ComplaintController implements ComplaintControllerImpl {

    private final ComplaintService complaintService;

    @Override
    @PostMapping("/send")
    public HttpEntity<?> addComplaint(@RequestBody ReqComplaintDto reqComplaintDto, Authentication authentication) {
        String email = authentication.getName();
        Users users = complaintService.getUserByUsername(email);
        if (users == null) {
            return ResponseEntity.status(401).body("Foydalanuvchi topilmadi.");
        }
        ApiResponse apiResponse = complaintService.addComplaint(reqComplaintDto, users);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteComplaint(@PathVariable UUID id) {
        ApiResponse apiResponse = complaintService.deleteComplaint(id);
        return ResponseEntity.status(apiResponse.success() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);

    }

    @Override
    @GetMapping("/all-message")
    public HttpEntity<?> getAllMessage() {
        List<ResComplaintDto> allMessage = complaintService.getAllComplaint();
        return ResponseEntity.ok(allMessage);
    }

}
