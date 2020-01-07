const handleError = (err) => {
  // Winston log stuff to file here
  // winston.error(err.stack)
  // Send a ping to some monitoring service 
  console.log(`^^ HANDLING ERROR - STATUS IS ${(err.status || 500)}`);
  console.log(`MESSAGE: ${err.message}`);
}
export {
  handleError
}