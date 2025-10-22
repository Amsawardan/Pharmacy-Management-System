# Raj Pharmacy - Java Backend Implementation Guide

## Overview
This guide will help you create a Java backend for your Raj Pharmacy admin dashboard using Spring Boot. The system will allow admin (Kethieswaran) to manage staff assignments for:
- User Management
- Order Management  
- Medicine Management

## Prerequisites
- Java 17 or higher
- Maven or Gradle
- MySQL or PostgreSQL database
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Step 1: Project Setup

### 1.1 Create Spring Boot Project
Use Spring Initializr (https://start.spring.io/) with these dependencies:
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Driver (or PostgreSQL Driver)
- Validation
- Lombok (optional but recommended)

### 1.2 Project Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/rajpharmacy/admin/
│   │       ├── RajPharmacyAdminApplication.java
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── entity/
│   │       ├── dto/
│   │       ├── config/
│   │       └── security/
│   └── resources/
│       ├── application.properties
│       └── static/
```

## Step 2: Database Configuration

### 2.1 Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/raj_pharmacy_admin
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

### 2.2 Database Schema
Create tables for:
- Users (customers, staff, admin)
- Staff (employees with roles and permissions)
- Roles (user management, order management, medicine management)
- Assignments (admin assigns staff to management areas)

## Step 3: Entity Classes

### 3.1 User Entity
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType; // CUSTOMER, STAFF, ADMIN
    
    @Column(nullable = false)
    private String fullName;
    
    private String phone;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime lastLogin;
    
    @Column(nullable = false)
    private boolean active = true;
}

enum UserType {
    CUSTOMER, STAFF, ADMIN
}
```

### 3.2 Staff Entity
```java
@Entity
@Table(name = "staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String employeeId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department; // PHARMACY, SALES, ADMIN
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StaffRole role; // PHARMACIST, ASSISTANT, MANAGER, ADMIN
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Permission> permissions;
    
    @Column(nullable = false)
    private LocalDate joinDate;
    
    private LocalDate lastShiftDate;
    
    @Enumerated(EnumType.STRING)
    private Shift currentShift; // MORNING, EVENING, NIGHT, OFF
    
    @Column(nullable = false)
    private boolean active = true;
}

enum Department {
    PHARMACY, SALES, ADMIN, OPERATIONS
}

enum StaffRole {
    PHARMACIST, ASSISTANT, MANAGER, ADMIN, CASHIER
}

enum Permission {
    USER_MANAGEMENT,
    ORDER_MANAGEMENT, 
    MEDICINE_MANAGEMENT,
    INVENTORY_VIEW,
    INVENTORY_MANAGE,
    PRESCRIPTIONS_VIEW,
    PRESCRIPTIONS_APPROVE,
    REPORTS_VIEW,
    STAFF_VIEW,
    STAFF_MANAGE
}

enum Shift {
    MORNING, EVENING, NIGHT, OFF
}
```

### 3.3 Management Assignment Entity
```java
@Entity
@Table(name = "management_assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagementAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "assigned_by_admin_id", nullable = false)
    private Staff assignedByAdmin; // Kethieswaran (admin)
    
    @ManyToOne
    @JoinColumn(name = "assigned_staff_id", nullable = false)
    private Staff assignedStaff;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ManagementArea managementArea; // USER_MANAGEMENT, ORDER_MANAGEMENT, MEDICINE_MANAGEMENT
    
    @Column(nullable = false)
    private LocalDateTime assignedAt;
    
    private LocalDateTime validUntil;
    
    @Enumerated(EnumType.STRING)
    private AssignmentStatus status = AssignmentStatus.ACTIVE;
    
    @Column(length = 500)
    private String notes;
}

enum ManagementArea {
    USER_MANAGEMENT,
    ORDER_MANAGEMENT, 
    MEDICINE_MANAGEMENT
}

enum AssignmentStatus {
    ACTIVE, EXPIRED, REVOKED
}
```

## Step 4: Repository Interfaces

### 4.1 User Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByUserType(UserType userType);
    List<User> findByActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:name% OR u.username LIKE %:name%")
    List<User> searchByNameOrUsername(@Param("name") String searchTerm);
}
```

### 4.2 Staff Repository
```java
@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUser(User user);
    Optional<Staff> findByEmployeeId(String employeeId);
    List<Staff> findByActiveTrue();
    List<Staff> findByDepartment(Department department);
    List<Staff> findByCurrentShift(Shift shift);
    List<Staff> findByPermissionsContaining(Permission permission);
}
```

### 4.3 Management Assignment Repository
```java
@Repository
public interface ManagementAssignmentRepository extends JpaRepository<ManagementAssignment, Long> {
    List<ManagementAssignment> findByAssignedStaff(Staff staff);
    List<ManagementAssignment> findByManagementArea(ManagementArea area);
    List<ManagementAssignment> findByStatus(AssignmentStatus status);
    List<ManagementAssignment> findByAssignedStaffAndStatus(Staff staff, AssignmentStatus status);
    List<ManagementAssignment> findByManagementAreaAndStatus(ManagementArea area, AssignmentStatus status);
}
```

## Step 5: Service Layer

### 5.1 Admin Management Service
```java
@Service
@Transactional
public class AdminManagementService {
    
    @Autowired
    private StaffRepository staffRepository;
    
    @Autowired
    private ManagementAssignmentRepository assignmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Staff> getAllStaff() {
        return staffRepository.findByActiveTrue();
    }
    
    public List<Staff> getStaffByDepartment(Department department) {
        return staffRepository.findByDepartment(department);
    }
    
    public ManagementAssignment assignStaffToManagementArea(
            Long adminId, Long staffId, ManagementArea area, String notes) {
        
        Staff admin = staffRepository.findById(adminId)
            .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        if (!admin.getRole().equals(StaffRole.ADMIN)) {
            throw new RuntimeException("Only admin can assign staff");
        }
        
        Staff staff = staffRepository.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Staff not found"));
        
        // Check if staff already has assignment for this area
        List<ManagementAssignment> existingAssignments = assignmentRepository
            .findByAssignedStaffAndStatus(staff, AssignmentStatus.ACTIVE);
        
        boolean alreadyAssigned = existingAssignments.stream()
            .anyMatch(assignment -> assignment.getManagementArea().equals(area));
        
        if (alreadyAssigned) {
            throw new RuntimeException("Staff already assigned to this management area");
        }
        
        ManagementAssignment assignment = new ManagementAssignment();
        assignment.setAssignedByAdmin(admin);
        assignment.setAssignedStaff(staff);
        assignment.setManagementArea(area);
        assignment.setAssignedAt(LocalDateTime.now());
        assignment.setNotes(notes);
        assignment.setStatus(AssignmentStatus.ACTIVE);
        
        // Add relevant permissions
        Set<Permission> newPermissions = new HashSet<>(staff.getPermissions());
        switch (area) {
            case USER_MANAGEMENT:
                newPermissions.add(Permission.USER_MANAGEMENT);
                break;
            case ORDER_MANAGEMENT:
                newPermissions.add(Permission.ORDER_MANAGEMENT);
                break;
            case MEDICINE_MANAGEMENT:
                newPermissions.add(Permission.MEDICINE_MANAGEMENT);
                break;
        }
        staff.setPermissions(newPermissions);
        staffRepository.save(staff);
        
        return assignmentRepository.save(assignment);
    }
    
    public void revokeManagementAssignment(Long assignmentId) {
        ManagementAssignment assignment = assignmentRepository.findById(assignmentId)
            .orElseThrow(() -> new RuntimeException("Assignment not found"));
        
        assignment.setStatus(AssignmentStatus.REVOKED);
        assignmentRepository.save(assignment);
        
        // Remove permissions
        Staff staff = assignment.getAssignedStaff();
        Set<Permission> permissions = new HashSet<>(staff.getPermissions());
        permissions.remove(getPermissionForArea(assignment.getManagementArea()));
        staff.setPermissions(permissions);
        staffRepository.save(staff);
    }
    
    private Permission getPermissionForArea(ManagementArea area) {
        switch (area) {
            case USER_MANAGEMENT: return Permission.USER_MANAGEMENT;
            case ORDER_MANAGEMENT: return Permission.ORDER_MANAGEMENT;
            case MEDICINE_MANAGEMENT: return Permission.MEDICINE_MANAGEMENT;
            default: return null;
        }
    }
    
    public List<ManagementAssignment> getActiveAssignments() {
        return assignmentRepository.findByStatus(AssignmentStatus.ACTIVE);
    }
    
    public List<ManagementAssignment> getAssignmentsByArea(ManagementArea area) {
        return assignmentRepository.findByManagementAreaAndStatus(area, AssignmentStatus.ACTIVE);
    }
}
```

## Step 6: Controller Layer

### 6.1 Admin Controller
```java
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class AdminController {
    
    @Autowired
    private AdminManagementService adminManagementService;
    
    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staff = adminManagementService.getAllStaff();
        return ResponseEntity.ok(staff);
    }
    
    @GetMapping("/staff/department/{department}")
    public ResponseEntity<List<Staff>> getStaffByDepartment(@PathVariable Department department) {
        List<Staff> staff = adminManagementService.getStaffByDepartment(department);
        return ResponseEntity.ok(staff);
    }
    
    @PostMapping("/assign-management")
    public ResponseEntity<ManagementAssignment> assignStaffToManagementArea(
            @RequestBody AssignManagementRequest request) {
        try {
            ManagementAssignment assignment = adminManagementService.assignStaffToManagementArea(
                request.getAdminId(),
                request.getStaffId(),
                request.getManagementArea(),
                request.getNotes()
            );
            return ResponseEntity.ok(assignment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/assignments/{assignmentId}")
    public ResponseEntity<Void> revokeAssignment(@PathVariable Long assignmentId) {
        try {
            adminManagementService.revokeManagementAssignment(assignmentId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/assignments")
    public ResponseEntity<List<ManagementAssignment>> getActiveAssignments() {
        List<ManagementAssignment> assignments = adminManagementService.getActiveAssignments();
        return ResponseEntity.ok(assignments);
    }
    
    @GetMapping("/assignments/area/{area}")
    public ResponseEntity<List<ManagementAssignment>> getAssignmentsByArea(@PathVariable ManagementArea area) {
        List<ManagementAssignment> assignments = adminManagementService.getAssignmentsByArea(area);
        return ResponseEntity.ok(assignments);
    }
}
```

### 6.2 DTO Classes
```java
public class AssignManagementRequest {
    private Long adminId;
    private Long staffId;
    private ManagementArea managementArea;
    private String notes;
    
    // Constructors, getters, setters
    public AssignManagementRequest() {}
    
    public AssignManagementRequest(Long adminId, Long staffId, ManagementArea managementArea, String notes) {
        this.adminId = adminId;
        this.staffId = staffId;
        this.managementArea = managementArea;
        this.notes = notes;
    }
    
    // Getters and setters
    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }
    
    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }
    
    public ManagementArea getManagementArea() { return managementArea; }
    public void setManagementArea(ManagementArea managementArea) { this.managementArea = managementArea; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
```

## Step 7: Security Configuration

### 7.1 Security Config
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/staff/**").hasAnyRole("ADMIN", "STAFF")
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic();
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## Step 8: Database Initialization

### 8.1 Create Data Initialization
```java
@Component
public class DataInitializer {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StaffRepository staffRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostConstruct
    public void initData() {
        // Create admin user (Kethieswaran)
        if (!userRepository.findByUsername("kethieswaran").isPresent()) {
            User adminUser = new User();
            adminUser.setUsername("kethieswaran");
            adminUser.setEmail("admin@rajpharmacy.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setUserType(UserType.ADMIN);
            adminUser.setFullName("Kethieswaran");
            adminUser.setPhone("+94 77 123 4567");
            adminUser.setCreatedAt(LocalDateTime.now());
            adminUser.setActive(true);
            
            User savedAdmin = userRepository.save(adminUser);
            
            // Create admin staff record
            Staff adminStaff = new Staff();
            adminStaff.setUser(savedAdmin);
            adminStaff.setEmployeeId("ADM001");
            adminStaff.setDepartment(Department.ADMIN);
            adminStaff.setRole(StaffRole.ADMIN);
            adminStaff.setPermissions(EnumSet.allOf(Permission.class));
            adminStaff.setJoinDate(LocalDate.now());
            adminStaff.setActive(true);
            
            staffRepository.save(adminStaff);
        }
    }
}
```

## Step 9: Testing Your APIs

### 9.1 Test with Postman/curl
```bash
# Get all staff
GET http://localhost:8082/api/admin/staff

# Assign staff to management area
POST http://localhost:8082/api/admin/assign-management
Content-Type: application/json

{
    "adminId": 1,
    "staffId": 2,
    "managementArea": "USER_MANAGEMENT",
    "notes": "Assigned by admin for user management"
}

# Get active assignments
GET http://localhost:8082/api/admin/assignments
```

## Step 10: Frontend Integration

Update your frontend to call these APIs:

```typescript
// In your React components
const API_BASE = 'http://localhost:8082/api/admin';

// Fetch staff list
const fetchStaff = async () => {
  const response = await fetch(`${API_BASE}/staff`);
  return response.json();
};

// Assign staff to management area
const assignStaff = async (adminId: number, staffId: number, area: string, notes?: string) => {
  const response = await fetch(`${API_BASE}/assign-management`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adminId, staffId, managementArea: area, notes })
  });
  return response.json();
};
```

## Next Steps for Your Team Members

1. **User Management Team**: Use the `USER_MANAGEMENT` permission to control user operations
2. **Order Management Team**: Use the `ORDER_MANAGEMENT` permission for order processing
3. **Medicine Management Team**: Use the `MEDICINE_MANAGEMENT` permission for inventory and medicine handling

Your backend is now ready to support admin dashboard functionality where Kethieswaran can assign staff members to different management areas with proper role-based access control.
