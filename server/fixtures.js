if (Wells.find().count() === 0) {
  Wells.insert({
    wellName: 'Oil Well #1',
    county: 'Dallas',
    state: 'Texas',
    url: '#',
    rigId: 1
  });

  Wells.insert({
    wellName: 'Oil Well #2',
    county: 'Tulsa',
    state: 'Oklahoma',
    url: '#'
  });

  Wells.insert({
    wellName: 'Oil Well #3',
    county: 'Dallas',
    state: 'Texas',
    url: '#'
  });
}