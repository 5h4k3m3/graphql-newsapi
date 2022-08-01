function postedBy(parent, args, context) {
  return context.prisma.link
    .findUnique({
      // parent: get 1st resolver level from 2nd resolver level
      where: { id: parent.id },
    })
    .postedBy();
}

module.exports = {
  postedBy,
};
