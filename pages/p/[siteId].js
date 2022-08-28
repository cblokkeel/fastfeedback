import React, { useRef, useState } from "react";
import { getAllFeedbackBySiteId, getAllSites } from "@/lib/db-admin";
import Feedback from "@/components/feedback/Feedback";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { createFeedback } from "@/lib/db";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedbacks } = await getAllFeedbackBySiteId(siteId);

  return {
    // Passed to the page component as props
    props: {
      initialFeedbacks: feedbacks,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

const SiteFeedback = ({ initialFeedbacks }) => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputRef.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
      rating: 5,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl my={8} onSubmit>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input type="comment" id="comment" ref={inputRef} />
          <Button type="submit" mt={2}>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
