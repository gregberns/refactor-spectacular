
// Starts with this 
buildFeaturePreview(vehicle: IVehicle): string {
  let featureList: string[] = [];
  let features: string = '';

  if (this.shouldShowMpg(vehicle)) {
    featureList.push(`${vehicle.MPGCity} / ${vehicle.MPGHighway} MPG`);
  }

  vehicle.HighlightedFeatures
    .map(feature => {
      featureList.push(`${feature.description}`);
    });

  features = featureList.join(', ');
  features += '...';

  return features;
}

shouldShowMpg(vehicle: IVehicle): boolean {
  return (
    vehicle &&
    (vehicle.MPGCity && vehicle.MPGCity !== 0) &&
    (vehicle.MPGHighway && vehicle.MPGHighway !== 0)
  );
}

//Refactored

buildFeaturePreview(vehicle: IVehicle): string {
  let mpg = this.shouldShowMpg(vehicle) ? `${vehicle.MPGCity} / ${vehicle.MPGHighway} MPG` : null;
  let features = vehicle.HighlightedFeatures.map(feature => feature.description);
  
  return [mpg, 
          ...features]
          .filter(cmp.isDefinedAndNotNull)
          .join(', ') +
          '...';
}
