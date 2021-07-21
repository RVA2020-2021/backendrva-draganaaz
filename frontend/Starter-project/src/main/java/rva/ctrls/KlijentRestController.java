package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Klijent;
import rva.repository.KlijentRepository;

@CrossOrigin
@RestController
@Api(tags = { "Klijent CRUD operations" })
public class KlijentRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("klijent")
	@ApiOperation( value = "Returns klijent")
	public Collection<Klijent> getKlijenti() {
		return klijentRepository.findAll();
	}
	
	@GetMapping("klijent/{id}")
	@ApiOperation( value = "Returns klijent by ID")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		return klijentRepository.getOne(id);
	}
	
	@GetMapping("klijentIme/{ime}")
	@ApiOperation( value = "Returns klijent by name")
	public Collection<Klijent> getKlijentByName(@PathVariable("ime") String ime) {
		return klijentRepository.findByImeContainingIgnoreCase(ime);
	}

	@PostMapping("klijent")
	@ApiOperation( value = "Creates klijent")
	public ResponseEntity<Klijent> addKlijent(@RequestBody Klijent klijent) {
		if (!klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		} 
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("klijent")
	@ApiOperation( value = "Updates klijent")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent) {
		if (!klijentRepository.existsById(klijent.getId())) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT );
		} 
		klijentRepository.save(klijent);
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	
	@DeleteMapping("klijent/{id}")
	@ApiOperation( value = "Deletes klijent by ID")
	public ResponseEntity<Klijent> deleteKlijent(@PathVariable("id") Integer id) {
		if (!klijentRepository.existsById(id)) {
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT );
		}   
		klijentRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute(
					"insert into \"klijent\" (\"id\", \"ime\", \"prezime\", \"broj_lk\", \"kredit\")"
					+ "values (-100, 'test', 'test', 1, 1)"
			);
			
		}
		return new ResponseEntity<Klijent>(HttpStatus.OK);
	}
	
	
}
 