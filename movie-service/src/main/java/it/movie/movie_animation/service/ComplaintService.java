package it.movie.movie_animation.service;

import it.movie.movie_animation.entity.Complaint;
import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.implment.service.ComplaintServiceImpl;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqComplaintDto;
import it.movie.movie_animation.payload.ResComplaintDto;
import it.movie.movie_animation.repository.AuthRepository;
import it.movie.movie_animation.repository.ComplaintRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ComplaintService implements ComplaintServiceImpl {
    public final ComplaintRepository complaintRepository;
    private final AuthRepository authRepository;

    @Override
    public ApiResponse addComplaint(ReqComplaintDto reqComplaintDto, Users users) {
        try {
            complaintRepository.save(
                    Complaint.builder()
                            .message(reqComplaintDto.message())
                            .userName(users.getName())
                            .userSurname(users.getSurname())
                            .users(users)
                            .build()
            );
            return new ApiResponse("habar yuborildi", true);
        } catch (Exception e) {
            return new ApiResponse("xatolik aka", false);
        }
    }

    @Override
    public ApiResponse deleteComplaint(UUID id) {
        try {
            Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getComplaint"));
            complaintRepository.delete(complaint);
            return new ApiResponse("Message ochirib tashlandi", true);
        } catch (Exception e) {
            return new ApiResponse("Message ochirishda hatolik", false);
        }

    }

    @Override
    public List<ResComplaintDto> getAllComplaint() {
        List<ResComplaintDto> resComplaintDtos = new ArrayList<>();
        for (Complaint complaint : complaintRepository.findAll()) {
            resComplaintDtos.add(new ResComplaintDto(
                    complaint.getMessage(),
                    complaint.getUserName(),
                    complaint.getUserSurname(),
                    complaint.getCreatedAt()
            ));
        }
        return resComplaintDtos;
    }

    public Users getUserByUsername(String email) {
        return (Users) authRepository.findByEmail(email);
    }
}
