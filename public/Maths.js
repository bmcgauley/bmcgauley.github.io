'use strict'



function getTotalCombinations2() {
    const selectedSubjects = Array.from(
		document.querySelectorAll('#subjects input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedScenes = Array.from(
		document.querySelectorAll('#scenes input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedStyles = Array.from(
		document.querySelectorAll('#styles input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedArtists = Array.from(
		document.querySelectorAll('#artists input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);
	const selectedMediums = Array.from(
		document.querySelectorAll('#mediums input[type="checkbox"]:checked')
	).map((checkbox) => checkbox.value);

    let subjectCount = selectedSubjects.length;
    // console.log(subjectCount)

    let sceneCount = selectedScenes.length;
    // console.log(sceneCount)

    let styleCount = selectedStyles.length;
    // console.log(styleCount)

    let artistCount = selectedArtists.length;
    // console.log(artistCount)

    let mediumCount = selectedMediums.length;
    // console.log(mediumCount)
    // let totalCombinations = subjectCount * sceneCount * styleCount * artistCount * mediumCount;
  if (!subjectCount || !sceneCount || !styleCount || !artistCount || !mediumCount) {
    subjectCount = 1
    sceneCount = 1
    styleCount = 1
    artistCount = 1
    mediumCount = 1
    let totalCombinations = subjectCount * sceneCount * styleCount * artistCount * mediumCount;
    console.log(totalCombinations)
    return totalCombinations;
  } else {
    let totalCombinations = subjectCount * sceneCount * styleCount * artistCount * mediumCount;
    return totalCombinations;
  }
    
    // console.log(totalCombinations)
   
  }
  
  function getTotalCombinations() {
    const selectedSubjects = Array.from(
      document.querySelectorAll('#subjects input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
    const selectedScenes = Array.from(
      document.querySelectorAll('#scenes input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
    const selectedStyles = Array.from(
      document.querySelectorAll('#styles input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
    const selectedArtists = Array.from(
      document.querySelectorAll('#artists input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
    const selectedMediums = Array.from(
      document.querySelectorAll('#mediums input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
  
    let subjectCount = selectedSubjects.length;
    let sceneCount = selectedScenes.length;
    let styleCount = selectedStyles.length;
    let artistCount = selectedArtists.length;
    let mediumCount = selectedMediums.length;
  
    let totalCombinations = 1;
  
    if (subjectCount > 0) {
      totalCombinations *= subjectCount;
    }
  
    if (sceneCount > 0) {
      totalCombinations *= sceneCount;
    }
  
    if (styleCount > 0) {
      totalCombinations *= styleCount;
    }
  
    if (artistCount > 0) {
      totalCombinations *= artistCount;
    }
  
    if (mediumCount > 0) {
      totalCombinations *= mediumCount;
    }
  
    console.log(totalCombinations);
    return totalCombinations;
  }
  