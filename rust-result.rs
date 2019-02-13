// In Rust, the `Result` type is used extensively. The problem is that
// using the `match` pattern can make code much more difficult to read.

// The following are several refactors that make the code:
// * more composable
// * easier to read
// * smaller, more reusable functions


// Example 1: Lift `Option` results into a `Result`

// Original
// This function takes a path like:
//   /drop-zone/some-file-name.txt
// and adds a sub folder
//   /drop-zone/archive/some-file-name.txt
fn modify_path(path: &PathBuf, filename: &OsStr) -> Result<PathBuf, Error> {
  match path.parent() {
    Some(parent) => Ok(parent.join("archive").join(filename)),
    None => Err(Error(format!(
      "Failed to create archive folder path: {:?}",
      path
    ))),
  }
}

// Result
// When we separate the 'system' code from the 'business logic'
//   it results in two functions which are both easier to understand
//   and easier to reuse.
fn modify_path(path: &PathBuf, filename: &OsStr) -> Result<PathBuf, Error> {
  let parent = path_parent(path)?;
  Ok(parent.join("archive").join(filename))
}

fn path_parent(path: &PathBuf) -> Result<PathBuf, Error> {
  match path.parent() {
    Some(parent) => Ok(parent.to_owned()),
    None => Err(Error(format!(
      "Path terminates in a root or prefix. Path: {:?}",
      path
    ))),
  }
}


// Example 2: 
// This was a nasty bit of code because it was simple but didnt look like it.
// It had similar problems as the first example where there was a combination
// of `Option` and `Result`.

fn get_file(path: &PathBuf) -> Result<FileRef, Error> {
  match path.file_name() {
    Some(osname) => match osname.to_str() {
      Some(filename) => match get_archive_path(path, osname) {
        Ok(archive_path) => Ok(FileRef {
          filename: filename.to_string(),
          path: path.to_path_buf(),
          archive_path: archive_path,
        }),
        Err(error) => Err(error),
      },
      None => Err(Error(format!(
        "Could not process file. Failed to check for UTF-8 validity: {}",
        path.display()
      ))),
    },
    None => Err(Error(format!(
      "Could not process file. path terminates in ...: {}",
      path.display()
    ))),
  }
}

// First Pass
// First, lets separate out the 'system' logic of getting 
// a file name as string, into a `file_name` function.
// This helps us because:
// * the `file_name` function is now reusable
// * the `get_file` function is simpler and 'business logic-y'
// * we now have a normalized return type of `Result`.

fn get_file(path: &PathBuf) -> Result<FileRef, Error> {
  match file_name(path) {
    Ok((filename, osname)) => 
      match get_archive_path(path, osname) {
        Ok(archive_path) => Ok(FileRef {
          filename: filename.to_string(),
          path: path.to_path_buf(),
          archive_path: archive_path,
        }),
        Err(error) => Err(error),
      },
    Err(error) => Err(error)
  }
}

fn file_name(path: &PathBuf) -> Result<(String, &OsStr), Error> {
  match path.file_name() {
    Some(osname) => match osname.to_str() {
        Some(filename) => Ok((filename.to_string(), osname)),
        None => Err(Error(format!(
          "Could not process file. Failed to check for UTF-8 validity: {}",
          path.display()
      ))),
    },
    None => Err(Error(format!(
      "Could not process file. path terminates in ...: {}",
      path.display()
    ))),
  }
}

// Second Pass on `get_file`
// This was actually **unsuccessful**, but I wnated to show it anyways.
// This shows the use of the `and_then` syntax (read: monad in Haskell).
// But it doesn't work because of how the `file_name` function 
// returns the `filename` and `osname`, and the `filename` needs 
// to be in scope in the second `and_then` lambda.
fn get_file(path: &PathBuf) -> Result<FileRef, Error> {
  file_name(path)
    .and_then(|(filename, osname)| get_archive_path(path, osname))
    .and_then(|archive_path| 
      Ok(FileRef {  //filename isn't in scope here
        filename: filename.to_string(),
        path: path.to_path_buf(),
        archive_path: archive_path,
      }))
}

//Third Pass
// So, lets use our `?` syntax again (`?` is like `do` notation in Haskell)
// This significantly simplifies what is happening here.
// Compare this to our original function!
fn get_file(path: &PathBuf) -> Result<FileRef, Error> {
  let (filename, osname) = file_name(path)?;
  let archive_path = get_archive_path(path, osname)?;
  Ok(FileRef {
    filename: filename.to_string(),
    path: path.to_path_buf(),
    archive_path: archive_path,
  })
}
