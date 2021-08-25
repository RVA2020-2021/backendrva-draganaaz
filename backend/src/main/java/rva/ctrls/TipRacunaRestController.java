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
import rva.jpa.TipRacuna;
import rva.repository.TipRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = { "Tip racuna CRUD operations" })
public class TipRacunaRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private TipRacunaRepository tipRacunaRepository;
	
	@GetMapping("tipRacuna")
	@ApiOperation( value = "Returns tip racuna")
	public Collection<TipRacuna> getTipoviRacuna() {
		return tipRacunaRepository.findAll();
	}
	
	@GetMapping("tipRacuna/{id}")
	@ApiOperation( value = "Returns tip racuna by ID")
	public TipRacuna getTipRacuna(@PathVariable("id") Integer id) {
		return tipRacunaRepository.getOne(id);
	}
	
	@GetMapping("tipRacunaNaziv/{naziv}")
	@ApiOperation( value = "Returns tip racuna by naziv")
	public Collection<TipRacuna> getTipRacunaByName(@PathVariable("naziv") String naziv) {
		return tipRacunaRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("tipRacuna")
	@ApiOperation( value = "Creates tip racuna")
	public ResponseEntity<TipRacuna> addTipRacuna(@RequestBody TipRacuna tipRacuna) {
		if (!tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		} 
		return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("tipRacuna")
	@ApiOperation( value = "Updates tip racuna")
	public ResponseEntity<TipRacuna> updateTipRacuna(@RequestBody TipRacuna tipRacuna) {
		if (!tipRacunaRepository.existsById(tipRacuna.getId())) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT );
		} 
		tipRacunaRepository.save(tipRacuna);
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
	
	@DeleteMapping("tipRacuna/{id}")
	@ApiOperation( value = "Deletes tip racuna by ID")
	public ResponseEntity<TipRacuna> deleteTipRacuna(@PathVariable("id") Integer id) {
		if (!tipRacunaRepository.existsById(id)) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT );
		}   
		tipRacunaRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute(
					"insert into \"tip_racuna\" (\"id\", \"naziv\", \"oznaka\", \"opis\")"
					+ "values (-100, 'test', 'test', 'test')"
			);
			
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
}
