  const formFields = [
    { label: "Display Name", type: "text", name: "displayName" },
  ];

  {formFields.map(({ label, type, name }) => {
          return (
            <FormInput
              label={label}
              type={type}
              required
              onChange={onChangeHandle}
              name="displayName"
              value={
                signUpFormData &&
                signUpFormData[name as keyof typeof signUpFormData]
              }
            />
          );
})}

const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  const onSignInwithRedirect = async () => {
    await signInWithRedirect(auth, googleAuthProvider);
  };

  React.useEffect(() => {
    const fetchRedirectResponse = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        await createUserDocument(response.user);
      }
    };
    fetchRedirectResponse();
  }, [auth]);