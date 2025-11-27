use whisper::bind::WhisperCppRaw;

fn main() -> Result<(), ::libloading::Error> {
  unsafe {
    let whisper = WhisperCppRaw::new("./lib/whisper.dll")?;
  }

  Ok(())
}
