/**
 * Adds a new error banner if there is an error with the API call.
 *
 * @param {Response} res - The response object from the API fetch request.
 * @param {string} message - The type of message, whether its for ForgotForm, Signup, or another form.
 * @param {(title: string, description: string) => void} addErrorBanner - A function to add a new error banner. This function takes two parameters:
 *   - `title`: A string representing the title of the error banner.
 *   - `description`: A string representing the description or message of the error banner.
 */
export const checkErrors = async (
  res: Response,
  message: string,
  addErrorBanner: (title: string, description: string) => void
) => {
  if (!res.ok) {
    const response = await res.json();

    Array.isArray(response.errors)
      ? addErrorBanner(message, response.errors[0].msg)
      : addErrorBanner(message, response.errors);
  }
};
