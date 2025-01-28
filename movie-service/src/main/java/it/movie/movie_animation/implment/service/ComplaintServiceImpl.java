package it.movie.movie_animation.implment.service;

import it.movie.movie_animation.entity.Users;
import it.movie.movie_animation.payload.ApiResponse;
import it.movie.movie_animation.payload.ReqComplaintDto;
import it.movie.movie_animation.payload.ResComplaintDto;

import java.util.List;
import java.util.UUID;

public interface ComplaintServiceImpl {

    ApiResponse addComplaint(ReqComplaintDto reqComplaintDto, Users users);

    ApiResponse deleteComplaint(UUID id);
    List<ResComplaintDto> getAllComplaint();
}
