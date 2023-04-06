import TestDataObject from './TestResource';

describe('DataObject', () => {
  it('should be able to create a DataObject', () => {
    const dataObject = new TestDataObject();
    expect(dataObject).toBeTruthy();
  });
});
