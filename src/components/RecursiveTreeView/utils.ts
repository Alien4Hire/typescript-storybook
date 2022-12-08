export const generateId = () => Math.random().toString(16).slice(2);

export const launchActivity = (
  activityId: string,
  caToken: string,
  integrationHubUrl: string
) => {
  const form = document.createElement('form');
  form.target = '_blank';
  form.method = 'POST';
  form.action = integrationHubUrl;
  form.style.display = 'none';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'activityId';
  input.value = activityId;
  form.appendChild(input);

  const inputToken = document.createElement('input');
  inputToken.type = 'hidden';
  inputToken.name = 'caToken';
  inputToken.value = caToken;
  form.appendChild(inputToken);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
