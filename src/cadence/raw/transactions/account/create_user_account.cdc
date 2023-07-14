import AccountCreator from 0xAccountCreator
/// This transaction creates an account from the given public key, using the signer's AccountCreator.Creator with the
/// signer as the account's payer, additionally funding the new account with the specified amount of Flow from the 
/// signer's account. The newly created account is then configured with resources & Capabilities necessary.
///
transaction(
        pubKey: String,
        fundingAmt: UFix64
    ) {

    prepare(signer: AuthAccount) {
        /* --- Create a new account --- */
        //
        // Ensure resource is saved where expected
        if signer.type(at: AccountCreator.CreatorStoragePath) == nil {
            signer.save(
                <-AccountCreator.createNewCreator(),
                to: AccountCreator.CreatorStoragePath
            )
        }
        // Ensure public Capability is linked
        if !signer.getCapability<&AccountCreator.Creator{AccountCreator.CreatorPublic}>(
            AccountCreator.CreatorPublicPath).check() {
            // Link the public Capability
            signer.unlink(AccountCreator.CreatorPublicPath)
            signer.link<&AccountCreator.Creator{AccountCreator.CreatorPublic}>(
                AccountCreator.CreatorPublicPath,
                target: AccountCreator.CreatorStoragePath
            )
        }
        // Get a reference to the client's AccountCreator.Creator
        let creatorRef = signer.borrow<&AccountCreator.Creator>(
                from: AccountCreator.CreatorStoragePath
            ) ?? panic("No AccountCreator in signer's account!")

        // Create the account
        let newAccount = creatorRef.createNewAccount(
            signer: signer,
            initialFundingAmount: fundingAmt,
            originatingPublicKey: pubKey
        )

        /* --- Set up Twitter.Collection --- */
        //
        // create & save it to the account
        //newAccount.save<@Twitter.Collection>(<-Twitter.createEmptyCollection(), to: Twitter.TweetCollectionStoragePath)

        // publish a reference to the Collection in storage
        //newAccount.link<&{Twitter.CollectionPublic}>(Twitter.TweetCollectionPublicPath, target: Twitter.TweetCollectionStoragePath)
    }
}

 