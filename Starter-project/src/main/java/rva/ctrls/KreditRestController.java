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
import rva.jpa.Kredit;
import rva.repository.KreditRepository;

@CrossOrigin
@RestController
@Api(tags = { "Kredit CRUD operations" })
public class KreditRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KreditRepository kreditRepository;
	
	@GetMapping("kredit")
	@ApiOperation( value = "Returns kredit")
	public Collection<Kredit> getKrediti() {
		return kreditRepository.findAll();
	}
	
	@GetMapping("kredit/{id}")
	@ApiOperation( value = "Returns klijent by ID")
	public Kredit getKredit(@PathVariable("id") Integer id) {
		return kreditRepository.getOne(id);
	}
	
	@GetMapping("kreditNaziv/{naziv}")
	@ApiOperation( value = "Returns kredit by naziv")
	public Collection<Kredit> getKreditByName(@PathVariable("naziv") String naziv) {
		return kreditRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("kredit")
	@ApiOperation( value = "Creates kredit")
	public ResponseEntity<Kredit> addKredit(@RequestBody Kredit kredit) {
		if (!kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		} 
		return new ResponseEntity<Kredit>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("kredit")
	@ApiOperation( value = "Updates kredit")
	public ResponseEntity<Kredit> updateKredit(@RequestBody Kredit kredit) {
		if (!kreditRepository.existsById(kredit.getId())) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT );
		} 
		kreditRepository.save(kredit);
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
	
	@DeleteMapping("kredit/{id}")
	@ApiOperation( value = "Deletes kredit by ID")
	public ResponseEntity<Kredit> deleteKredit(@PathVariable("id") Integer id) {
		if (!kreditRepository.existsById(id)) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT );
		}   
		kreditRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute(
					"insert into \"kredit\" (\"id\", \"naziv\", \"oznaka\", \"opis\")"
					+ "values (-100, 'test', 'test', 'test')"
			);
			
		}
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
}
