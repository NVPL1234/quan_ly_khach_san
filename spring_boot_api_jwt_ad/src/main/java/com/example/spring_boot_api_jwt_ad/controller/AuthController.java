package com.example.spring_boot_api_jwt_ad.controller;

import com.example.spring_boot_api_jwt_ad.entity.TaiKhoan;
import com.example.spring_boot_api_jwt_ad.service.TokenService;
import com.example.spring_boot_api_jwt_ad.service.UserService;
import com.example.spring_boot_api_jwt_ad.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/tai_khoan")
	public TaiKhoan register(@RequestBody TaiKhoan nguoiDung) {
		if (nguoiDung.getMatKhau() != null)
			nguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));
		return userService.createUser(nguoiDung);
	}

	@GetMapping("/tai_khoan/{tenDangNhap}")
	public TaiKhoan layTKTheo(@PathVariable String tenDangNhap) {
		return userService.findByTenDangNhap(tenDangNhap);
	}

//     Object principal = SecurityContextHolder
//             .getContext().getAuthentication().getPrincipal();
// 
//         if (principal instanceof UserDetails) {
//         UserPrincipal userPrincipal = (UserPrincipal) principal;
//     }

}
