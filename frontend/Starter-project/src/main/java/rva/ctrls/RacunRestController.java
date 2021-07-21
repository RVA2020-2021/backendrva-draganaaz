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
import rva.jpa.Racun;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = { "Racun CRUD operations" })
public class RacunRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@GetMapping("racun")
	@ApiOperation( value = "Returns racun")
	public Collection<Racun> getRacuni() {
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	@ApiOperation( value = "Returns racun by ID")
	public Racun getRacun(@PathVariable("id") Integer id) {
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racunNaziv/{naziv}")
	@ApiOperation( value = "Returns racun by naziv")
	public Collection<Racun> getRacunByName(@PathVariable("naziv") String naziv) {
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("racun")
	@ApiOperation( value = "Creates racun")
	public ResponseEntity<Racun> addRacun(@RequestBody Racun racun) {
		if (!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		} 
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	@ApiOperation( value = "Updates racun")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun) {
		if (!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT );
		} 
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation( value = "Deletes racun by ID")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if (!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT );
		}   
		racunRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute(
					"insert into \"racun\" (\"id\", \"naziv\", \"oznaka\", \"opis\", \"tip_racuna\", \"klijent\")"
					+ "values (-100, 'test', 'test', 'test', 1, 2)"
			);
			
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}

}
